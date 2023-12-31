import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import { useDispatch, useSelector } from 'react-redux';
import { adminspiecahrt } from '../../redux/features/adminSlice';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


export default function PieOrderChart() {


    const {  piecahrt } = useSelector((state) => state.admin);
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(adminspiecahrt())
    },[dispatch])

console.log(piecahrt,"ppppppppppppppppppppppppppp")




    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie
                    data={piecahrt}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={145}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {piecahrt.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
            <div className=''>
                <div className="inline-flex gap-5 items-center mx-10 ">
                    {
                        piecahrt.map((item) => (
                            <p>{item.name}</p>
                        ))
                    }

                </div>
                <div className='inline-flex gap-10 items-center mx-16 '>
                    {
                        COLORS.map((item, index) => (
                            <div className="h-[30px] w-[30px]" style={{ backgroundColor: item }} key={index}></div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}