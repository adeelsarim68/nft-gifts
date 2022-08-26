import { Box, Card, CardContent, CardMedia, CardActionArea, Grid, Typography } from '@mui/material/'

const MarketPlace = () => {
  return (
    <>
      <Typography sx={{ textAlign: 'center', mt:3, mb: 5 }} variant="h3" component="h2">
        Items for Sale
      </Typography>
      <Grid container spacing={2} sx={{ px:10 }}>
        <>
          {Array.from(Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ maxWidth: 350 }}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='250'
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjcj0BdNL6beCLSRLzwYD6oMzkiRLgCvUs0w&usqp=CAU'
                    alt='green iguana'
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        sx={{ flexGrow: 1 }}
                        gutterBottom
                        variant='h6'
                        component='div'
                      >
                        name
                      </Typography>
                      <Typography
                        sx={{ color: 'red' }}
                        gutterBottom
                        variant='h6'
                        component='div'
                      >
                        0.05 Eth
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        sx={{ flexGrow: 1, mt: 2 }}
                        gutterBottom
                        component='div'
                      >
                        Collection Name
                      </Typography>
                      <Box
                        style={{
                          borderRadius: '10px',
                          overflow: 'hidden',
                        }}
                      >
                        <CardMedia
                          component='img'
                          height='40'
                          width='40'
                          image='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png'
                          alt='ethereum'
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </>
      </Grid>
    </>
  )
}

export default MarketPlace;