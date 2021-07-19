import React, { useEffect, useState } from "react";
import axios from 'axios';
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

const tableIcons = {
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

export default function App() {

  const [dataALL,setDataALL] = useState([]);
  const [dataBTC,setDataBTC] = useState();
  const [dataETH,setDataETH] = useState();

  useEffect(() => {
    getDataBTC()
    getDataETH()

  }, [])

  function getDataBTC() {
    const url = 'https://fapi.bybt.com/api/openInterest/pc/info?symbol=BTC';
    axios.get(url)
        .then(results => {
          setDataBTC(results.data.data)
        })
  }
  function getDataETH() {
    const url = 'https://fapi.bybt.com/api/openInterest/pc/info?symbol=ETH';
    axios.get(url)
        .then(results => {
          setDataETH(results.data.data)
        })
  }

  return (
      <div style={{borderRadius: 10, maxWidth: "90%", marginLeft: "60px", marginRight: "60px", marginTop: "20px" , marginBottom: "20px" }}>
        <MaterialTable
            data={dataBTC}
            title='Token Data'
            icons={tableIcons}
            options={{
              grouping: false,
              paging:false,
              padding: "dense"

            }}

            detailPanel={rowData => {
              return (
                  <MaterialTable
                      data={dataETH}
                      options={{
                        grouping: false,
                        paging:false,
                        search: false,
                        showTitle: false,
                        padding: "dense",
                        header: false

                      }}
                      columns={[
                        {
                          title: 'Exchange',
                          field: 'image',
                          render: rowData => (
                              <img
                                  style={{ height: 24}}
                                  src={rowData.exchangeLogo}
                                  alt="exchange"
                              />
                          ),
                        },
                        { title: "Exchange", field: "exchangeName", align: 'right' },
                        { title: "Price", field: "price", type: "currency", align: 'right' },
                        { title: "OI (USD)", field: "openInterest" , type: "currency", align: 'right' },
                        { title: "OI (Token)", field: "openInterestAmount" , type: "numeric", align: 'right' },
                        { title: "1H Change", field: "h1OIChangePercent", type: "numeric" },
                        { title: "4H Change", field: "h4OIChangePercent", type: "numeric" },
                        { title: "24H Change", field: "h24Change", type: "numeric" }
                      ]}

                  />
              )
            }}
            columns={[
              {
                title: 'Exchange',
                field: 'image',
                render: rowData => (
                    <img
                        style={{ height: 24}}
                        src={rowData.exchangeLogo}
                        alt="profile"
                    />
                ),
              },
              { title: "Exchange", field: "exchangeName", align: 'right' },
              { title: "Price", field: "price", type: "currency", align: 'right' },
              { title: "OI (USD)", field: "openInterest" , type: "currency", align: 'right' },
              { title: "OI (Token)", field: "openInterestAmount" , type: "numeric", align: 'right' },
              { title: "1H Change", field: "h1OIChangePercent", type: "numeric" },
              { title: "4H Change", field: "h4OIChangePercent", type: "numeric" },
              { title: "24H Change", field: "h24Change", type: "numeric" }
            ]}
        />
      </div>
  );

}
