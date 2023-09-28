import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import PieOrderChart from "../../components/admin/PieChart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UserCount from "../../components/admin/UserCount";
import { adminsalesReport } from "../../redux/features/adminSlice";

export default function Agentdashboard() {
    const dispatch = useDispatch();
    const { salesreport } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(adminsalesReport())
    }, [dispatch]);

    return (
        <div>
            <div>
              <UserCount/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flexBasis: "48%" }}>
                    <div>
                        <h1 style={{marginLeft:"100px"}}>Earnings</h1>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                data={salesreport}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 50,
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
                <div style={{ textAlign: "center" }}>
    <h2 style={{ fontSize: "44px", marginRight: "50px", marginTop: "20px" }}>Order Chart</h2>
</div>
                    <div style={{ textAlign: "center" }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieOrderChart />
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}
