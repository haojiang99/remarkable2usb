const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const configPath = 'config.json';
const uploadUrl = 'http://10.11.99.1/upload';

function uploadPDF(filePath) {
  // Read the PDF file as a blob
  const fileData = fs.readFileSync(filePath);
  const formData = new FormData();
  formData.append('file', fileData, { filename: filePath });

  // Send POST request to upload the file
  axios
    .post(uploadUrl, formData, {
      headers: formData.getHeaders(),
    })
    .then(() => {
      console.log('PDF file uploaded successfully.');

      // Delete the uploaded file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted:', filePath);
        }
      });
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error('AxiosError:', error.message);
      } else {
        console.error('Error uploading PDF file:', error);
      }
    });
}

function checkAndUploadPDF() {
  // Read the config file
  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading config file:', err);
      return;
    }

    try {
      const config = JSON.parse(data);
      const { folderPath } = config;

      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error('Error reading folder:', err);
          return;
        }

        const pdfFiles = files.filter((file) => file.endsWith('.pdf'));
        if (pdfFiles.length === 0) {
          console.log('No PDF file found in the folder.');
          return;
        }

        pdfFiles.forEach((pdfFile) => {
          const filePath = `${folderPath}/${pdfFile}`;
          uploadPDF(filePath);
        });
      });
    } catch (error) {
      console.error('Error parsing config file:', error);
    }
  });
}

// Check and upload PDF files initially
checkAndUploadPDF();

// Continuously check for new PDF files every 5 seconds
setInterval(checkAndUploadPDF, 5000);
