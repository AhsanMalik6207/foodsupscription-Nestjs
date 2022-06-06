import Banner from '../components/Banner';
import Paidinvoice from '../components/Paidinvoice'
import Weeklymenu from '../components/Weeklymenu'
import { Grid } from '@material-ui/core';
const Home = () => {
    return (
        <>
            <Banner />
            <Grid container>
                <Grid container item xs={12} sm={9} lg={9}>
                    <Weeklymenu />
                </Grid>
                <Grid item lg={3} xs={12} sm={3}>
                    <Paidinvoice />
                </Grid>
            </Grid>
        </>
    )
}

export default Home;