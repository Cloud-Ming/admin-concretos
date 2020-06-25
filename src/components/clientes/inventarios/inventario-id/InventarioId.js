import React, { Fragment } from "react";
import GastosForm from "./GastosForm";
import Preformas from "./Preformas";

function InventarioId(props) {
	// const [data, setData] = useState(props);
	const data = props.data;

	// console.log("Props:", data);

	return (
		<Fragment>
			<div>
				{data.map((item, key) => (
					<div key={key}>
						<p>{item.fecha}</p>
						<p>{item.inventario}</p>
					</div>
				))}
			</div>

			<div>
				<GastosForm />
			</div>

			<div>
				<Preformas />
			</div>
		</Fragment>
	);
}
export default InventarioId;
