import React, { Component, Fragment } from "react";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = (theme) => ({
	table: {
		minWidth: 650,
	},
});

class Tabla extends Component {
	constructor(props) {
		super(props);

		this.idUsuario = props.idUsuario;
		this.nombreUsuario = props.nombreUsuario;
		this.emailUsuario = props.emailUsuario;
		this.celularUsuario = props.celularUsuario;
		this.rows = props.rows;
	}

	marcar(id) {
		this.props.marcarComoImportante(id);
	}

	render(props) {
		const { classes } = this.props;

		return (
			<Fragment>
				<TableContainer component={Paper}>
					{/*className={classes.table}*/}
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Id</TableCell>
								<TableCell align="right">Nombre</TableCell>
								<TableCell align="right">Celular</TableCell>
								<TableCell align="right">Email</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{this.rows.map((row) => (
								<TableRow key={row.name}>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell align="right">
										{row.name}
									</TableCell>
									<TableCell align="right">
										{row.phone}
									</TableCell>
									<TableCell align="right">
										{row.email}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				{/*	<div>
					{this.idUsuario}
					&nbsp;&nbsp;
					{this.nombreUsuario}
					&nbsp;&nbsp;
					{this.emailUsuario}
					&nbsp;&nbsp;
					{this.celularUsuario}
					<button onClick={() => this.marcar(this.idUsuario)}>
						Importante
					</button>
				</div>*/}
			</Fragment>
		);
	}
}

export default withStyles(useStyles)(Tabla);
