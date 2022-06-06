import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    banner: {
        backgroundImage: `url(${'https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg'})`,
        width: '100%',
        height: '50vh',
        backgroundPosition: 'left 0px bottom 0px',
        backgroundSize: 'cover'
    },
    wrapper: {
        padding: 20,
        '& > *': {
            marginTop: 50
        }
    },
    text: {
        color: '#878787'
    },
})

const About = () => {
    const classes = useStyles();
    return (
        <Box>
            <Box className={classes.banner}></Box>
            <Box className={classes.wrapper}>
                <Typography variant="h3"> Corporate Home Made Food Subscription Services </Typography>
                <Typography variant="h5" className={classes.text}>
                    We provide freshly cooked, hygienic food for our corporate home made food subscription services.
                </Typography>
                <Typography variant="h5" className={classes.text}>
                    We have professional chefs who understand the need of our customer and the food cooked by our chefs will make you lick your fingers.
                </Typography>
                <Typography variant="h5" className={classes.text}>
                    Our chefs innately understand the taste and preferences of various people residing in Coimbatore and come out with some of the most mouthwatering nutritious dishes possible.
                </Typography>
            </Box>
        </Box>
    )
}

export default About;