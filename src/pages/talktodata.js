import React, { useCallback, useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function TalkToData() {
  const [answerText, setAnswerText] = useState('Answer will appear here');
  const [loading, setLoading] = React.useState(false);
  const [initialTextCount, setInitialTextCount] = React.useState(0);

  const handleSubmit = async (event) =>  {
    event.preventDefault();
    setAnswerText("Answer will appear here");
    if (!loading) {
      setLoading(true);
    }
    const data = new FormData(event.currentTarget);
    console.log({
      question: data.get('question')
    });
    //Invoke Flask backend API
    var url = "http://localhost:5000/askquestion"
    const response = await fetch(url,{
      method: 'post',
      body: JSON.stringify({question: data.get('question')}),
      headers: {'Content-Type':'application/json'},
      //mode: "cors", "ngrok-skip-browser-warning": true
    });
    const mydata = await response.json();
    console.log(mydata);
    setAnswerText(mydata.message);
    setLoading(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'block',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth:"md",
            textAlign:'center'
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <QuestionMarkIcon />
          </Avatar> */}  
          <Typography component="h1" variant="h5">
            Ask Question
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} textAlign='center'>
            <TextField
              margin="normal"
              required
              fullWidth
              id="question"
              label="Question"
              name="question"
              autoComplete="question"
              defaultValue="e.g., How many sales orders are there?"
              autoFocus
              onClick={(e) => {
                if (initialTextCount == 0) {
                  e.target.value = "How many sales orders are there?";
                  setInitialTextCount(1);
                }
              }}
            />
            <Button
              type="submit"
              margin="normal"
              maxWidth="sm"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

            >
              Submit
            </Button>
            
            {loading && (<Box>
              <CircularProgress 
                maxWidth="sm"
                margin="normal"
                sx={{ mt: 3, mb: 2 }}
              />
            </Box>)}


              
              <Typography id="answer" variant="body1" gutterBottom>
                {answerText}
              </Typography>



          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}