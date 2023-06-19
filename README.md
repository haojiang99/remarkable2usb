# Save or Print PDFs from webpage etc. and send automatically to Remarkable 2 without need of Sync account

I have multiple Remarkable2 tablet and there's just no need to keep multiple sync account with each one of those.

One thing I used the most with RM2 is actually to read news articles online. Usually I just setup a folder to auto send files to the RM2 directly through its USB interface.

This is the small utility I wrote to do this automatically. In the config.json file, you setup a folder which the program is watching constantly. Once you save or print the web page to a PDF inside this folder, it will be automatically sent to RM2.

The source code is on Github in the link, to use it, make sure you have node.js installed and run 'node r2usb.js' then it's all set.


# Install

npm install axios

# Usage

setup config.js for the folder to upload PDFs

Node r2usb.js


