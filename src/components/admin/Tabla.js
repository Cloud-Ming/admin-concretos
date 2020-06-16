import React, { Component, Fragment } from "react";


class Tabla extends Component {
	constructor(props) {
		super(props);
		this.idUsuario = props.idUsuario;
		this.nombreUsuario = props.nombreUsuario;
		this.emailUsuario = props.emailUsuario;
		this.celularUsuario = props.celularUsuario;
	}

	marcar(id) {
		this.props.marcarComoImportante(id);
	}

	render(props) {
		return (
			<Fragment>
				<div>
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
				</div>
			</Fragment>
		);
	}
}

export default Tabla;
