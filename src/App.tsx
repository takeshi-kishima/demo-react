import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import logo from './logo.svg';
import './App.css';

interface row {
  firstName: string;
  lastName: string;
  address: string;
}
const useStyles = makeStyles({
  root: {
    width: '70%',
  },
  container: {
    maxHeight: 340,
  },
});

function Hello() {
  const { history, location, match } = useReactRouter();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState(new Array<row>());
  useEffect(() => {
    console.log("ユーズ");
    console.log(rows);
  });
  const rowsX: Array<row> = [
    {"firstName": "xx", "lastName": "ww", "address": "yahoo1"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo2"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo3"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo4"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo5"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo6"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo7"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo8"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo9"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo10"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo11"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo12"},
    {"firstName": "xx", "lastName": "ww", "address": "yahoo13"},
  ];

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string | number; }; }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
              <TableCell>ボタン</TableCell>
              <TableCell
                    key="firstName"
                    align="center"
                    style={{ minWidth: 10 }}
                  >
                    名
                  </TableCell>
                  <TableCell
                    key="lastName"
                    align="center"
                    style={{ minWidth: 10 }}
                  >
                    姓
                  </TableCell>
                  <TableCell
                    key="address"
                    align="center"
                    style={{ minWidth: 10 }}
                  >
                    アド
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.address}>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => {waiwai(row.firstName);}}>・</Button>
                    </TableCell>
                    <TableCell key="firstName" valign="bottom">
                      {row.firstName}
                    </TableCell>
                    <TableCell key="lastName" valign="bottom">
                      {row.lastName}
                    </TableCell>
                    <TableCell key="address" valign="bottom">
                      {row.address}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <p>{`pathname: ${location.pathname}`}</p>
      <Button color="primary" variant="contained" onClick={() => history.push('/react')}>Next</Button>
      <Button variant="contained" onClick={() => {setRows(rows => [...rows, {"firstName": "xx" + (rows.length + 1), "lastName": "ww", "address": "yahoo" + (rows.length + 1)}]);}}>取得</Button>
    </>
  );
}

function HelloReact() {
  const { history, location, match } = useReactRouter();
  return (
    <div>
      <h1>HelloReact</h1>
      <p>{`pathname: ${location.pathname}`}</p>
      <Button color="secondary" variant="contained" onClick={() => history.push('/')}>Next</Button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="\"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <Button variant="contained" onClick={() => {console.log('↓'); waiwai(); console.log('↑');}}>xxxx</Button> */}
        <Router>
          <Switch>
            <Route path="/" component={Hello} exact />
            <Route path="/react" component={HelloReact} exact />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

function waiwai(name: string) {
  fetch("http://localhost:8080/greeting?name=" + name, 
  {
    mode: 'cors'
  }).then((res) => res.json()).then(json => {
    console.log(json);
  });
}
async function getList(rows: Array<row>): Promise<Array<row>> {
  let result : row[] = [];
  var resultArr: Array<row> = new Array();
  try {
    const res: Response = await fetch("http://localhost:8080/getList");
    const json = await res.json();
    console.log(json);
    if (json) {
      result = json;
      // result.copyInto(json);
      //  JSON.parse(json);
      result.forEach(row => resultArr.push(row));
    }
    console.log(result);
    console.log(resultArr);
  } catch (error) {
    console.error(error);
  }
  rows.push({"firstName": "xx" + (rows.length + 1), "lastName": "ww", "address": "yahoo" + (rows.length + 1)});
  console.log(rows);
  return resultArr;
}
export default App;
