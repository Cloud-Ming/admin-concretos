import React, { Fragment } from "react";

// import { Divider } from "@material-ui/core/";

export default function Tabla(props) {
	const { data, id_cliente } = props;

	return (
		<Fragment>
			<div style={{ padding: 10 }}>
				{/*<VerProyectosId data={data} />*/}
				<h1>Admin {id_cliente}</h1>

				{data.map((inventario, index) => (
					<div
						key={inventario.id}
						style={{
							border: "1px solid #ddd",
							marginBottom: 10,
							padding: 10,
							borderRadius: 10,
						}}
					>
						<h3>{index + 1}</h3>
						<h1>{inventario.descripcion}</h1>
						<p>
							<b>Fecha: </b>
							{inventario.fecha}
						</p>
						<p>
							<b>Descripcion: </b>
							{inventario.descripcion}
						</p>

						<b>Inventario: </b>
						{/*{inventario.inventario}*/}

						{JSON.parse(inventario.inventario).map((item) => (
							<div
								key={item.service + item.service}
								style={{
									border: "1px solid #ddd",
									padding: 10,
									marginBottom: 10,
									marginTop: 10,
									backgroundColor: "#f4f4f4",
								}}
							>
								<p>
									<b>Servicio: </b> {item.service}
								</p>
								<p>
									<b>Precio: </b> {item.price}
								</p>
								<p>
									<b>Cantidad: </b> {item.count}
								</p>
								<p>
									<b>iva: </b> {parseFloat(item.iva)}%
								</p>
								<p>
									<b>Valor iva: </b>{" "}
									{parseInt(item.price) *
										parseFloat(item.iva)}
								</p>

								{/*<p>
									<b>Id servicio: </b> {item.id_service}
								</p>*/}

								{/*<p>
									<b>Retención: </b> {item.retencion}%
								</p>
								*/}

								<p>
									<b>Retención: </b>{" "}
									{parseInt(item.price) *
										parseFloat(item.retencion)}
								</p>

								{/*<h2>Valor total: {parseInt(item.price)}</h2>*/}
							</div>
						))}
					</div>
				))}
				<br />
				<h1>
					<p>
						<b>Retención de la fuente: </b> $0
					</p>
					<p>
						<b>Total a pagar:</b> $0
					</p>
				</h1>
			</div>
		</Fragment>
	);
}
