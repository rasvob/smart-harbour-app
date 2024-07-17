import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HomeIcon, BoxesPlusIcon,  GlobeIcon, WarningIcon, PlusCircleIcon, PlusIcon, MinusCircleIcon, RightArrowTop, CreditCardIcon } from "../Icons/SvgIcons";
import { useAuthStore } from "../../Data/AuthStore";
import { getDashboardData, WS_URL } from '../../API/RestApi';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import toast from "react-hot-toast";

const DatetimeComponent = ({date, time}) => {
    return (
        <div>
            <span className="text-sm text-gray-500">{date}</span>
            <span className="text-4xl">{time}</span>
        </div>
    );
};

const NowSummaryComponent = ({title, username, role}) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [date, setDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-between">
            <p className="text-4xl">{title}</p>
            <DatetimeComponent date={date} time={time} />
        </div>
    );
};

const StatLink = ({to, icon}) => {
    return (
        <div className="stat">
            <div className="flex flex-col items-center justify-center">
                <Link to={to}>
                    <div className="text-secondary btn btn-circle btn-outline btn-secondary">
                        {icon}
                    </div>
                </Link>
            </div>
        </div>
    )
};

const StatItemComponent = ({title, value, desc, descValue=null, icon=null, altIcon=null}) => {
    return (
        <div className="stat">
            <div className="stat-figure text-primary">
                {icon}
            </div>
            <div className="stat-title text-xl">{title}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-desc text-xl">
                <div className="flex-inline flex items-center mt-2">
                    <span className="mr-2">{altIcon}</span>
                    <span className="">{desc}{descValue}</span>
                </div>
            </div>
        </div>
    );
};

const CurrentStatsComponent = ({data}) => {
    const statsItems = [
        {title: "Počet lodí v přístavu", value: data.today_in_marina, desc: "Nerozpoznaných: ", descValue: data.today_in_marina_undetected_identifier, icon: "home"},
        {title: "Dnes připlutí", value: data.today_arrived, desc: "Nerozpoznaných: ", descValue: data.today_arrived_undetected_identifier, icon: "inflow"},
        {title: "Dnes odplutí", value: data.today_departed, desc: "Nerozpoznaných: ", descValue: data.today_departed_undetected_identifier, icon: "outflow"},
    ];

    const getIconByName = (name) => {
        switch (name) {
            case "home":
                return <HomeIcon />;
            case "inflow":
                return <PlusCircleIcon />;
            case "outflow":
                return <MinusCircleIcon />;
            default:
                return <GlobeIcon />;
        }
    };

    return (
        <div className="shadow stats">
            {
                statsItems.map((item, index) => {
                    return (
                        <StatItemComponent key={index} title={item.title} value={item.value} desc={item.desc} descValue={item.descValue} icon={getIconByName(item.icon)} altIcon={<WarningIcon isActive={item.descValue > 0} />} />
                    );
                })
            }
            <StatLink to="/state-details" icon={<RightArrowTop />} />
        </div>
    );
};

const PaymentsStats = ({data}) => {
    const paymentStatsItem =  {'payed': data.today_payed, 'unpayed': data.today_not_payed};
    
    return (
        <div className="stats shadow">
            <StatItemComponent title="Zaplacené lodě" value={paymentStatsItem['payed']} icon={paymentStatsItem['payed'] == 0 ? <WarningIcon isActive={true} /> : null } />
            <StatItemComponent title="Nezaplacené lodě" value={paymentStatsItem['unpayed']} icon={paymentStatsItem['unpayed'] > 0 ? <WarningIcon isActive={true} /> : null } />

            <StatLink to="/payments" icon={<CreditCardIcon />} />
        </div>
    );
};

const CurrentUserComponent = ({username, role}) => {
    return (
        <div className="flex gap-2">
            <p className="text-base-content">Přihlášený uživatel: {username}</p>
            <p className="text-base-content">(role: {role})</p>
        </div>
    );
};



const Home = () => {
    const user = useAuthStore((state) => state.currentUser);
    const token = useAuthStore((state) => state.token);
    const [dashboardData, setDashboardData] = useState({});
    const { sendMessage, lastMessage,  readyState, sendJsonMessage } = useWebSocket(WS_URL, {
        shouldReconnect: (closeEvent) => true,
      });

    const loadDashBoardData = async () => {
        const data = await getDashboardData(token);
        setDashboardData(data);
    };

    useEffect(() => {
        loadDashBoardData();
    }, []);

    useEffect(() => {
        const connectionStatus = {
            [ReadyState.CONNECTING]: 'Connecting',
            [ReadyState.OPEN]: 'Open',
            [ReadyState.CLOSING]: 'Closing',
            [ReadyState.CLOSED]: 'Closed',
            [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
          }[readyState];

        console.log(connectionStatus);

        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({type: 'authorization', token: token});
        }

    }, [readyState]);

    useEffect(() => {
        if (lastMessage) {
            if (lastMessage.type === 'error') {
                toast.error(lastMessage.message);
            } else if (lastMessage.type === 'image') {
                console.log(lastMessage);
            }
        }
    }, [lastMessage]);

    return (
        <div className="container mx-auto">
            <div className="my-2">
                <NowSummaryComponent title="Aktuální přehled" />
            </div>

            <div className="my-2">
                <CurrentUserComponent username={user.full_name} role={user.role} />
            </div>

            <div className="my-2 flex justify-between flex-wrap space-y-4 2xl:space-y-0">
                <CurrentStatsComponent data={dashboardData} />
                <PaymentsStats data={dashboardData} />
            </div>

            <div className="mt-4 skeleton w-full h-60"></div>
        </div>
    );
};  

export default Home;