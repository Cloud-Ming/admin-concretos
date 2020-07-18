import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  const { id, fecha, descripcion, monto, funcion } = props;

  // Styles
  const classes = useStyles();
  
  return (
    <Card className={classes.root} style={{ backgroundColor: "#ffd90a2e",maxWidth:"100px" }}>
      <CardContent>
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
      </CardActions>
    </Card>
  );
}
