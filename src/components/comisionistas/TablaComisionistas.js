import React, { Fragment } from "react";

// import Titulo from "../titulo/Titulo";

import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";


import VisibilityIcon from "@material-ui/icons/Visibility";



const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? (
					<LastPageIcon />
				) : (
					<FirstPageIcon />
				)}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? (
					<FirstPageIcon />
				) : (
					<LastPageIcon />
				)}
			</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
	table: {
		minWidth: 650,
	},
	titleHead: {
		fontWeight: "bold",
	},
});

function TablaComisionistas(props) {
	const { data } = props;

	const clientes = data;

	const classes = useStyles2();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(clientes.length);

	const emptyRows =
		rowsPerPage -
		Math.min(rowsPerPage, clientes.length - page * rowsPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Fragment>
			<div style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}>
				<TableContainer component={Paper}>
					<Table
						className={classes.table}
						aria-label="custom pagination table"
					>
						<TableHead>
							<TableRow>
								<TableCell className={classes.titleHead}>
									Nombre
								</TableCell>

								<TableCell className={classes.titleHead}>
									Celular
								</TableCell>

								<TableCell className={classes.titleHead}>
									Fecha creación
								</TableCell>
						
								<TableCell className={classes.titleHead}>
									Ver comisiones
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(rowsPerPage > 0
								? clientes.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
								  )
								: clientes
							).map((row) => (
								<TableRow key={row.nombre}>
									<TableCell component="th" scope="row">
										{row.nombre}
									</TableCell>
									<TableCell style={{ width: 160 }}>
										{row.celular}
									</TableCell>

									<TableCell style={{ width: 160 }}>
										{row.fecha}
									</TableCell>

									
									<TableCell style={{ width: 160 }}>
										<IconButton
											component={Link}
											to={`ver-comisionista/${row.id}/${btoa(row.nombre)}`}
											aria-label="delete"
											className={classes.margin}
										>
											<VisibilityIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}

							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[
										`${clientes.length}`,
										10,
										25,
										{ label: "Todos", value: -1 },
									]}
									colSpan={3}
									count={clientes.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										inputProps: {
											"aria-label": "Filas por página",
										},
										native: true,
									}}
									labelRowsPerPage={"Filas por página"}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={
										handleChangeRowsPerPage
									}
									ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>

			</div>
		</Fragment>
	);
}

export default TablaComisionistas;
