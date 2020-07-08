import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from './../../Common/modal';
import Confirmation from './../../Common/confirmation';
import { translate } from "./../../../util/translate";
import { isAuthenticated } from './../../../util/user';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: translate('common.name') },
  { id: 'nameAr', numeric: false, disablePadding: true, label: translate('common.nameAr') },
  { id: '', numeric: false, disablePadding: true, label: translate('common.actions') },
];


function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align={"center"} padding="checkbox">
        {isAuthenticated()?(
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': translate('common.selectAll') }}
          />
        ):null}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            align={"center"}
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? translate('common.desc') : translate('common.asc')}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: '1 1 100%',
    },
  }),
);


const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { selected, requestDeleteAll, setSelected } = props;
  const [deleteAllConfirmation, setDeleteAllConfirmation] = React.useState(false);

  const handleDeleteAll = () => {
    requestDeleteAll(selected);
    setSelected([]);
  }
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selected.length && isAuthenticated() > 0,
      })}
    >
            <Confirmation 
      onOk={()=>handleDeleteAll()}
      onClose={() => setDeleteAllConfirmation(false)} 
      open={deleteAllConfirmation} 
      title={translate('common.confirmation')} 
      body={`${translate('common.deletedConfirmation')}`} />

      {selected.length > 0 && isAuthenticated() ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {selected.length} {translate('common.selected')}
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {translate('city.cities')}
          </Typography>
        )}
      {selected.length > 0 && isAuthenticated() ? (
        <Tooltip title={translate('common.delete')}>
          <IconButton onClick={() => setDeleteAllConfirmation(true)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          null
        )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);
export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  const [deleted, setDeleted] = React.useState('');


  const handleDelete = () => {
    props.requestDeleteCity(deleted);
  }
  const rows = props.cities;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
 
  const handleEdit = (row) => {
    props.handleEdit(row);
  }




  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Modal onClose={() => props.closeDeletedModal()} open={props.isDeleted} title={translate('common.success')} body={`${translate('common.deletedSuccess')}`} />
      <Modal onClose={() => props.closeDeletedAllModal()} open={props.isDeletedMultiple} title={translate('common.success')} body={`${translate('common.deletedSuccess')}`} />
       <Confirmation 
      onOk={()=>handleDelete()}
      onClose={() => setDeleteConfirmation(false)} 
      open={deleteConfirmation} 
      title={translate('common.confirmation')} 
      body={`${translate('common.deletedConfirmation')}`} />
       
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar setSelected={setSelected} requestDeleteAll={props.requestDeleteAll} selected={selected} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell align={"center"} padding="checkbox">
                        {isAuthenticated()?(
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                          ):null}
                        </TableCell>
                        <TableCell align={"center"} component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align={"center"}>
                          {row.nameAr}
                        </TableCell>
                        <TableCell align={"center"}>
                          {isAuthenticated()?(<div>
                          <Tooltip title={translate('common.delete')}>
                              <IconButton onClick={(e) => { e.stopPropagation(); setDeleteConfirmation(true);setDeleted(row.id); }} aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={translate('common.edit')}>
                              <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(row); }} aria-label="Edit">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            </div>):null}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage={translate('common.rowPerPage')}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label={translate('common.densePadding')}
        />
      </div>
    </div>
  );
}
