import React, { Fragment, useState, useEffect } from "react";
import uniqid from "uniqid";
import {
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	makeStyles,
} from "@material-ui/core";

function GastosForm(props) {
	const { id_cliente, gastos } = props;
	const [data, setData] = useState(
		gastos[0].gastos ? JSON.parse(gastos[0].gastos) : []
	);

	const [formData, setFormData] = useState({
		id: null,
		monto: 0,
		descripcion: "",
		fecha: new Date().toLocaleString(),
	});

	useEffect(() => {
		console.log("UseEffect GastosForm:", data);
		// enviarData(data);

		//Controler
		const abortController = new AbortController();

		var formData = new FormData();
		formData.append("id", id_cliente);
		formData.append("objeto", JSON.stringify(data));

		fetch(
			"https://botanicainternacionalamazonas.com/backend/vista/clientes/inventarios/agregarGastosId.php",
			{
				method: "POST",
				mode: "cors",
				signal: abortController.signal,
				body: formData,
			}
		)
			.then((res) => res.json())
			.then((res) => {
				// if (res === 401) {

				// 	return;
				// }

				console.log(res);
			})
			.catch((err) => {
				console.error("Request failed", err);
			});

		// Cancel the request if it takes more than 5 seconds
		setTimeout(() => abortController.abort(), 5000);

		//Controler
		/**/
	}, [data, id_cliente]);

	// Generador de ID unico
	const uniqueId = uniqid();

	const ingresarData = (e) => {
		e.preventDefault();
		// e.reset();
		setFormData({
			monto: 0,
			descripcion: "",
		});

		setData((newList) => [
			...newList,
			{
				id: uniqueId,
				monto: formData.monto,
				descripcion: formData.descripcion,
				fecha: new Date().toLocaleString(),
			},
		]);
	};

	const eliminarData = (id) => {
		const newList = data.filter((item) => item.id !== id);
		setData(newList);
		console.log(id);
	};

	const onChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const useStyles = makeStyles({
		titlePrincipal: {
			marginLeft: 15,
		},
		root: {
			minWidth: 275,
			marginBottom: 20,
		},
		bullet: {
			display: "inline-block",
			margin: "0 2px",
			transform: "scale(0.8)",
		},
		title: {
			fontSize: 22,
		},
		pos: {
			marginBottom: 12,
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
					<div>
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
						>
							Gastos adicionales
						</Typography>
						{data === null
							? "No hay."
							: data.length === 0
							? "No hay.."
							: data.map((item, i) => (
									<div key={i}>
										Descripcion: {item.descripcion}
										<br />
										Monto {item.monto}
										<br />
										<button
											onClick={() =>
												eliminarData(item.id)
											}
										>
											Eliminar
										</button>
										<br />
										<br />
									</div>
							  ))}

						<br />
					</div>
					<br />
					<form onSubmit={(e) => ingresarData(e)}>
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
						>
							Agregar gastos
						</Typography>
						<TextField
							id="outlined-basic"
							label="Descripcion"
							variant="outlined"
							value={formData.descripcion}
							name="descripcion"
							onChange={(event) => onChange(event)}
						/>
						<br />
						<br />

						<TextField
							id="outlined-basic"
							label="Monto"
							variant="outlined"
							name="monto"
							type="number"
							value={formData.monto}
							onChange={(event) => onChange(event)}
						/>

						<br />
						<br />

						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Agregar
						</Button>
						{/*<button onClick={()=>senData()}>Send data</button>*/}
					</form>
				</CardContent>
			</Card>
		</Fragment>
	);
}

export default GastosForm;
// https://botanicainternacionalamazonas.com/backend/vista/comisionistas/cargarComisionistas.php?id=1
