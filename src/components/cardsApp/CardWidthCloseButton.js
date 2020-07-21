import React, { Fragment } from "react";

const CardWidthCloseButton = (props) => {
	const { idUnico, icons, fecha, titulo, descripcion, codigo, url, button, funcion } = props;

	return (
		<Fragment>
			{/*<DescriptionIcon style={{ fontSize: "50px" }} />*/}
			<br />
			<small>Fecha: {fecha}</small>
			<br />
			<small>Titulo: {titulo}</small>
			<br />
			<small>Descripción: {descripcion}</small>
			<br />
			<small>Codigo: {codigo}</small>
			<br />
			<a href={url} target="_blank" rel="noopener noreferrer">
				Ver
			</a>
			&nbsp;&nbsp;
			<button onClick={() => funcion(idUnico)}>
				{button}
			</button>
		</Fragment>
	);
};
export default CardWidthCloseButton;
