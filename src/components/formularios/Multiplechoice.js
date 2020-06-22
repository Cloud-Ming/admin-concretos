import React, { useState, Fragment } from "react";

function MultipleChoice() {
  // let listInitialServices =
  //   JSON.parse(window.localStorage.getItem("listInitialServices")) || [];

  const [servicesState, setServicesState] = useState([]);

  // Un estado inicial para los datos del form
  const [datosForm, setDatosForm] = useState({
    id: 1,
    client: "",
    service: "",
    price: 0,
    count: 0,
  });

  // useEffect(() => {
  //   window.localStorage.setItem(
  //     "listInitialServices",
  //     JSON.stringify(servicesState)
  //   );

  //   console.log(servicesState);
  // }, [servicesState]);

  const handleChange = (event) => {
    console.log(datosForm);
    setDatosForm({
      ...datosForm,
      [event.target.name]: event.target.value,
    });
  };

  const addUser = () => {
    setServicesState((newList) => [
      ...newList,
      {
        id: datosForm.id++,
        service: datosForm.service,
        price: datosForm.price,
        count: datosForm.count,
      },
    ]);
  };

  const removeUser = (id) => {
    console.log(id);
    const newList = servicesState.filter((item) => item.id !== id);
    setServicesState(newList);
  };

  return (
    <Fragment>
      <h1>Formulario</h1>

      <br />
      <div>
        <input
          type="text"
          name="client"
          onChange={handleChange}
          placeholder="Nombre"
        />
        <br />
        {servicesState.map((el) => (
          <div key={el.id} className="itemSevice">
            <p>{el.service}</p>
            <p>{el.price}</p>
            <p>{el.count}</p>
            <button onClick={() => removeUser(el.id)}>x</button>
          </div>
        ))}
        <br />
        <input
          type="text"
          name="service"
          onChange={handleChange}
          placeholder="Servicio"
        />
        <br />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Precio"
        />
        <br />
        <input
          type="number"
          name="count"
          onChange={handleChange}
          placeholder="Cantidad"
        />
      </div>

      <button onClick={() => addUser()}>Add</button>
      <button onClick={() => console.log(servicesState)}>Count</button>
      <button onClick={() => console.log(datosForm)}>Count datos</button>
    </Fragment>
  );
}
export default MultipleChoice;
