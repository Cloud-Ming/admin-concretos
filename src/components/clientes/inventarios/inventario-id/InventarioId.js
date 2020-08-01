import React, { Fragment } from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import Avatar from "@material-ui/core/Avatar";
import Assignment from "@material-ui/icons/Assignment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// import Titulo from "../../../titulo/Titulo";

// Formulario de añadir gastos
import GastosForm from "./gastos/gastos/GastosForm";

// Formulario añadir comisionistas
import FormComisionistas from "./gastos/comisionistas/Admin";

import AdminCotizaciones from "./pdf/cotizaciones/Admin";

import Preformas from "./pdf/preformas/Admin";

import Facturas from "./pdf/facturas/Admin";

// Styles
const useStyles = makeStyles({
	titlePrincipal: {
		marginLeft: 15,
	},
	root: {
		minWidth: 275,
		marginBottom: 20,
	},
	title: {
		fontSize: 22,
	},
	list: {
		marginRight: 15,
		padding: 10,
	},
	containerFlexInventario: {
		display: "flex",
		flexDirection: "row",
	},
});

function InventarioId(props) {
	const { idInventario, data } = props;

	// Inhability
	// id_cliente

	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	// const operacionTotal = (data, key) => {
	// 	let json = JSON.parse(data);
	// 	let result = [];
	// 	// console.log(json);
	// 	for (var i = 0; i < json.length; i++) {
	// 		result.push(parseInt(json[i].price * json[i].count));
	// 		// console.log(key, json[i]);
	// 	}

	// 	const reducer = (accumulator, currentValue) =>
	// 		accumulator + currentValue;
	// 	return result.reduce(reducer);
	// };

	// Styles
	const classes = useStyles();

	return (
		<Fragment>
			<div
				style={{
					marginTop: 10,
					marginLeft: 10,
					marginRight: 10,
				}}
			>
				{data.map((item, key) => (
					<Card key={key} className={classes.root}>
						<CardHeader
							title={item.descripcion}
							subheader={item.fecha}
						/>

						<CardContent>
							<ExpansionPanel
								expanded={expanded === "panel1"}
								onChange={handleChange("panel1")}
							>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1bh-content"
									id="panel1bh-header"
								>
									<Typography className={classes.heading}>
										Inventario:
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<div
										className={
											classes.containerFlexInventario
										}
									>
										{JSON.parse(item.inventario).map(
											(data, i) => (
												<Card
													key={i}
													className={classes.list}
												>
													<CardHeader
														key={i}
														avatar={
															<Avatar
																aria-label="recipe"
																className={
																	classes.avatar
																}
															>
																<Assignment />
															</Avatar>
														}
														title={data.service}
														subheader={`Cantidad: ${data.count}, Precio unitario: $${data.price}`}
													/>
													{/*
													<CardContent></CardContent>
												*/}
												</Card>
											)
										)}
									</div>
								</ExpansionPanelDetails>
							</ExpansionPanel>

							{/*Total: ${operacionTotal(item.inventario, key)}*/}
						</CardContent>
					</Card>
				))}

				<GastosForm id_cliente={idInventario} gastos={data} />

				<FormComisionistas />

				<AdminCotizaciones data={data} />

				<Preformas data={data} />

				<Facturas />
			</div>
		</Fragment>
	);
}
export default InventarioId;
