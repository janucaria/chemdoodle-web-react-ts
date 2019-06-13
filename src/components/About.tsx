import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    aboutPaper: {
      display: "flex",
      flexDirection: "column",
      flex: "1 1 auto",
      padding: "10px"
    }
  }));

interface Props {
  resizeCanvasSketcherToFalse(): void;
}

export default function About(props: Props): JSX.Element {
  const classes = useStyles();
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    }

    // eslint-disable-next-line
  }, []);

  function updateDimensions(event: UIEvent) {
    props.resizeCanvasSketcherToFalse();
  }

  return (
    <Paper className={classes.aboutPaper} elevation={1}>
      <p>This app just for demo building UI for <a target="_blank" rel="noopener noreferrer" href="https://web.chemdoodle.com/">Chemdoodle Web Component</a> with <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">React JS</a> and <a target="_blank" rel="noopener noreferrer" href="https://material-ui.com/">Material-UI</a></p>
      <p>This app basically not working because it not access the <a target="_blank" rel="noopener noreferrer" href="https://web.chemdoodle.com/docs/ichemlabs-cloud-services/">iChemLabs Cloud Services</a> for related molecule data.<i></i></p>
      <p>The source code can found in <a target="_blank" rel="noopener noreferrer" href="https://github.com/janucaria/chemdoodle-web-react-ts">https://github.com/janucaria/chemdoodle-web-react-ts</a></p>
    </Paper>
  )
}
