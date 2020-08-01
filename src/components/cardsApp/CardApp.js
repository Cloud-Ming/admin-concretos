import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

// Icons
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const { id, fecha, descripcion, monto, funcion, icon } = props;

  // Styles
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ maxWidth: "100px" }}>
      <CardHeader
        avatar={
          icon
        }
        title={descripcion}
        subheader={`Monto: $${monto} - Fecha: ${fecha}`}
        action={
          <IconButton onClick={() => funcion(id)}>
            <DeleteIcon />
          </IconButton>
        }
      />

      {/* <CardContent>
        <Typography variant="body2" component="p">
          {fecha}
        </Typography>
        <Typography variant="body2" component="p">
          {descripcion}
        </Typography>
        <Typography variant="body2" component="p">
          {monto}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => funcion(id)}>
          Eliminar
        </Button>
      </CardActions>*/}
    </Card>
  );
}
