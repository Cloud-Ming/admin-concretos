import React, { Fragment } from "react";
import {
	Card,
	CardContent,
	Typography,
	Divider,
	makeStyles,
} from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// import Titulo from "../../../titulo/Titulo";

// Formulario de añadir gastos
// import GastosForm from "./gastos/gastos/GastosForm";

// Formulario añadir comisionistas
// import FormComisionistas from "./gastos/comisionistas/Admin";

// import AdminCotizaciones from "./pdf/cotizaciones/Admin";

import Preformas from "./pdf/preformas/Admin";
// import Facturas from "./pdf/facturas/Admin";

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
		margin: 0,
		padding: 10,
	},
});

function InventarioId(props) {
	const { data } = props;

	// Inhability
	// id_cliente

	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const operacionTotal = (data, key) => {
		let json = JSON.parse(data);
		let result = [];
		// console.log(json);
		for (var i = 0; i < json.length; i++) {
			result.push(parseInt(json[i].price * json[i].count));
			// console.log(key, json[i]);
		}

		const reducer = (accumulator, currentValue) =>
			accumulator + currentValue;
		return result.reduce(reducer);
	};

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
						<CardContent>
							<Typography
								className={classes.title}
								color="textSecondary"
								gutterBottom
							>
								Inventario
							</Typography>
							{/*<Typography variant="h6" component="p">
									Descripción:
								</Typography>*/}
							<p style={{ marginTop: "0" }}>{item.descripcion}</p>
							<Typography variant="body2" component="p">
								<b>Fecha</b> {item.fecha}
							</Typography>
							<br />
							<Divider />
							<br />
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
										Lista servicios
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									{JSON.parse(item.inventario).map(
										(data, i) => (
											<div
												key={i}
												className={classes.list}
											>
												<div>
													<b>Servicio:</b>{" "}
													{data.service}
												</div>
												<div>
													<b>Precio:</b> {data.price}
												</div>
												<div>
													<b>Cantidad:</b>{" "}
													{data.count}
												</div>
											</div>
										)
									)}
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<br />
							<Divider />
							<br />
							Total: ${operacionTotal(item.inventario, key)}
						</CardContent>
					</Card>
				))}

				{/*<GastosForm id_cliente={id_cliente} gastos={data} />*/}

				{/*<FormComisionistas />*/}

				{/*<AdminCotizaciones data={data} />*/}

				<Preformas data={data} />

				{/*<Facturas />*/}
			</div>
		</Fragment>
	);
}
export default InventarioId;
