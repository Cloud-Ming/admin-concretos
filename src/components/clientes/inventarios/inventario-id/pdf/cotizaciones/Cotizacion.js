import React, { Fragment, useState } from "react";
import {
	Card,
	CardContent,
	Typography,
	Button,
	makeStyles,
} from "@material-ui/core";

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

function Cotizaciones(props) {
	const { data, id_inventario } = props;

	const [dataPreformas, setDataPreformas] = useState(data ? data : []);

	// Enviar data al Backend
	const crearPreforma = () => {
		setDataPreformas([
			{
				fecha: "202020",
				descripcion: "xxx",
			},
			{
				fecha: "202020",
				descripcion: "xxx",
			},
		]);
		console.log(sendData);
	};

	// Inhability
	//Controler
	const sendData = () => {
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id_inventario", id_inventario);
		formData.append("nombre_preforma", "prueba4");

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/pdf/crearPreforma.php",
			{
				method: "POST",
				mode: "cors",
				signal: abortController.signal,
				body: formData,
			}
		)
			.then((res) => res.text())
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.error("Request failed", err);
				// setErrorLogin("A ocurrido un error");
				// handleClick();
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 3000);

		//Controler
	};

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

	const classes = useStyles();

	return (
		<Fragment>
			<Card className={classes.root}>
				<CardContent>
					{dataPreformas === null
						? "No hay"
						: dataPreformas.map((preforma, index) => (
								<div
									key={index}
									style={{
										border: "1px solid #ddd",
										padding: 10,
										marginBottom: 10,
									}}
								>
									<InsertDriveFileIcon />
									<br />
									{preforma.fecha}
									<br />
									{preforma.descripcion}
									<br />
									<a
										href={preforma.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										Ver
									</a>
								</div>
						  ))}

					<br />
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Crear cotización
					</Typography>
					<div>
						<Button
							onClick={() => crearPreforma()}
							variant="contained"
							color="primary"
						>
							Agregar
						</Button>
					</div>
				</CardContent>
			</Card>
		</Fragment>
	);
}

export default Cotizaciones;
