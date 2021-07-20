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

export default function OpenInterestTable() {

  const [dataOiALL,setDataOiALL] = useState([]);
  const [dataOiEX,setDataOiEX] = useState([]);

  function updateData() {
      const tokens = ["BTC", "ETH", "LINK", "UNI", "DOT", "SNX", "SUSHI", "BNB", "AAVE", "YFI", "MKR", "SOL", "LTC", "DOGE"];
      setDataOiALL([])
      setDataOiEX([])
      tokens.map((token, i) =>
          getDataOi(token)
      )
  }
  useEffect(() => {
      updateData()
  }, [])

    function getDataOi(ticker) {
        const url = 'https://fapi.bybt.com/api/openInterest/pc/info?symbol=' + ticker;
        axios.get(url)
            .then(results => {
                setDataOiALL(oldData => [...oldData, results.data.data[0]])
                results.data.data.map((result, i) => {
                    if (!(i === 0)) {
                        setDataOiEX(oldData => [...oldData, result])
                    }
                    }
                )
            })
    }

  return (
      <div style={{borderRadius: 10, maxWidth: "90%", marginLeft: "60px", marginRight: "60px", marginTop: "20px" , marginBottom: "20px" }}>
        <MaterialTable
            data={dataOiALL}
            title='Open Interest'
            icons={tableIcons}
            options={{
              grouping: false,
              paging:false,
              padding: "dense",
            }}

            detailPanel={rowData => {
              return (
                  <MaterialTable
                      data={dataOiEX.filter(row => row.symbol === rowData.symbol)}
                      icons={tableIcons}
                      options={{
                        grouping: false,
                        paging:false,
                        search: false,
                        showTitle: false,
                        padding: "dense",
                        header: true,
                          toolbar: false
                      }}
                      columns={[
                        {
                          title: 'Exchange',
                          field: 'image',
                          align: 'center',
                          render: rowData => (<img style={{ height: 24}} src={rowData.exchangeLogo} alt="exchange"/>),
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
              { title: "Symbol", field: "symbol", align: 'right' },
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
