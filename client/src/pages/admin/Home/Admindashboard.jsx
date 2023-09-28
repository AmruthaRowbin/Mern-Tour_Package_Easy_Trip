import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { adminsalesReport } from "../../../redux/features/adminSlice";
import UserCount from "../../../components/admin/UserCount";
import PieOrderChart from "../../../components/admin/PieChart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Admindashboard() {
    const dispatch = useDispatch();
    const { salesreport } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(adminsalesReport());
    }, [dispatch]);

    return (
        <div>
            <div>
                <UserCount />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flexBasis: "48%" }}>
                    <div>
                        <h1>Earnings</h1>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                data={salesreport}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div style={{ flexBasis: "48%" }}>
                    <div>
                        <h2>Order Chart</h2>
                    </div>
                    <div>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieOrderChart />
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}
