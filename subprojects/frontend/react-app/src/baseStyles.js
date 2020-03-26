import { makeStyles } from '@material-ui/core/styles';

const useStylesBase = makeStyles(theme => ({
  content: {
    paddingTop: theme.spacing(3),
    marginTop: theme.spacing(3),
    color: 'blue', // 🔵
  },
}));

export default useStylesBase;