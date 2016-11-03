import React from 'react';
import { MedicationTableStyle, MedicationBodyDivStyle } from '../../styles';
import Table from 'rc-table';
require('rc-table/assets/index.css');


const columns = [{
    title: 'Medication', dataIndex: 'medication', key: 'medication', width: '24%',
}, {
    title: 'Dosage', dataIndex: 'dosage', key: 'dosage', width: '24%',
}, {
    title: 'Date', dataIndex: 'date', key: 'date', width: '24%',
    render: (date)=>dateFormat(date)
}, {
    title: 'Comments', dataIndex: 'comments', key: 'comments', width: '24%'
}];

const BolusMedicationsTable = ({data,title}) =>
    (<Table columns={columns} data={data} className="table" scroll={{ y: '150' }} title={<div><h3>{title}</h3></div>}/>);

const dateFormat = (date) => {
    return { children: new Date(date).toLocaleString(), props: { colSpan: 1, rowSpan: 1 } }
};

export default BolusMedicationsTable;
