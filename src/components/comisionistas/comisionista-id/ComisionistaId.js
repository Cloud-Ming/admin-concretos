import React, { Fragment } from "react";

function Check(props) {
	console.log("Check props", props.id);

	// const marcarPago = (id, checked) => {
	// 	console.log();
	// };

	return (
		<Fragment>
			<input
				type="checkbox"
				value={props.id}
				onChange={(event) =>
					console.log(event.target.value, event.target.checked)
				}
			/>
		</Fragment>
	);
}

function ComisionistaId(props) {
	const { id_cliente, data } = props;
	console.log(data);

	return (
		<Fragment>
			<div style={{ padding: 10 }}>
				<h1>Comisionista {id_cliente}</h1>
				{data.map((item) => (
					<div
						key={item.id}
						style={{
							border: "1px solid #ddd",
							padding: "10px",
							marginBottom: "10px",
						}}
					>
						Fecha: {item.fecha}
						<br />
						Proyecto: {item.nombre_inventario}
						<br />
						Monto: {item.monto}
						<br />
						Pago:{" "}
						{JSON.parse(item.pago) ? (
							<Check id={item.id} />
						) : (
							<Check id={item.id} />
						)}
						<br />
						<br />
					</div>
				))}
			</div>
		</Fragment>
	);
}
export default ComisionistaId;
