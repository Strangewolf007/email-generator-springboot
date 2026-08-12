// filepath: c:\Users\Admin\Desktop\Gen AI Email Assistant\email-writer-react\src\App.jsx
import { useState } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import './App.css';
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8801/api/email/generate", {
        emailContent,
        tone,
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "#f0f0f0", // Light gray background
      },
    },
    particles: {
      number: {
        value: 100, // Increase the number of particles
      },
      size: {
        value: 3, // Particle size
      },
      move: {
        enable: true,
        speed: 2, // Speed of particle movement
      },
      opacity: {
        value: 0.5, // Transparency of particles
      },
      links: {
        enable: true,
        color: "#000", // Link color
        distance: 150, // Distance between linked particles
      },
    },
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background */}
      <Particles
    id="tsparticles"
    init={particlesInit}
    options={particlesOptions}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
    }}
     />

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Email Reply Generator
        </Typography>

        <Box sx={{ mx: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label={"Tone (Optional)"}
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Generate Reply"}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {generatedReply && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Generated Reply:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={generatedReply || ''}
              inputProps={{ readOnly: true }}
            />

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigator.clipboard.writeText(generatedReply)}
            >
              Copy to Clipboard
            </Button>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default App;