let costumeData = {
    "costumes": [
        "witch",
        "nurse",
        "construction worker",
        "pumpkin",
        "lightning bolt",
        "farmer",
        "priest",
        "nun",
        "astronaut",
        "clown",
        "skeleton",
        "mummy",
        "zombie",
        "corpse bride",
        "egyptian",
        "devil",
        "vampire"
    ]
};

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const url = "https://replicate-api-proxy.glitch.me/create_n_get/";

// Resize the canvas to fit the window
function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(ratio, ratio);  // Scale the context based on the device's pixel ratio
    console.log("Canvas sized to");
}

// Fetch the costumes.json and populate the canvas with images
async function fetchAndRenderCostumes() {
    try {
        const response = await fetch('/costumes.json');  // Fetch the JSON file
        const data = await response.json();  // Parse the JSON data
        console.log('Costumes data loaded successfully:');
        console.log(data);

        // Clear the canvas before rendering
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Iterate through the costumes array and render each image
        data.costumes.forEach(costume => {
            if (costume.type === "image") {
                console.log("Image URL: ", costume.imageURL);  // Log each image URL
                const img = new Image();  // Create a new image element
                img.src = costume.imageURL;  // Set the image URL

                // Once the image is loaded, draw it on the canvas
                img.onload = function () {
                    console.log("Image loaded: ", img.src);
                    ctx.save();  // Save the canvas state
                    ctx.translate(costume.Xposition + 50, costume.Yposition + 50);  // Move to the center of the image
                    ctx.rotate(costume.rotation || 0);  // Rotate the image (default to 0 if no rotation)
                    ctx.drawImage(img, -50, -50, 150, 150);  // Draw the image at the specified position
                    ctx.restore();  // Restore the previous state of the canvas
                };

                img.onerror = function () {
                    console.error("Error loading image: ", img.src);  // Log errors 

                };
            }
        });
    } catch (error) {
        console.error('Error fetching or rendering costumes:', error);
    }
}

// Initial setup
window.onload = function () {
    resizeCanvas();  // Ensure the canvas fits the window
    myInput();
    fetchAndRenderCostumes();  // Fetch the JSON and render the images
    console.log(canvas.width);
    console.log(canvas.height);

    // Re-fetch and render the costumes whenever the window is resized
    window.addEventListener('resize', function () {
        resizeCanvas();
        fetchAndRenderCostumes();
        console.log(canvas.width);
        console.log(canvas.height);

    });
};

function myInput() {
    inputBox = document.createElement('input');
    inputBox.setAttribute('type', 'text');
    inputBox.setAttribute('id', 'inputField');
    inputBox.setAttribute('placeholder', 'Name your spirit animal.');
    document.body.appendChild(inputBox);

    // Add event listener to the input box
    inputBox.addEventListener('keydown', function (event) {
        // Check if the Enter key is pressed
        // let location = { x: getRandomIntInclusive(0, canvas.width), y: getRandomIntInclusive(canvas.height / 10, canvas.height), rotation: (100 * (getRandomIntInclusive(-10, 10) * (Math.PI / 180))) }; 
        let location = { x: getRandomIntInclusive(10, 800), y: getRandomIntInclusive(10, 600), rotation: (100 * (getRandomIntInclusive(-10, 10) * (Math.PI / 180))) };

        if (event.key === 'Enter') {
            const inputValue = inputBox.value;
            askModel(inputValue, location);
        }
    });

    // Log to check if inputText is properly attached
    console.log("Input element added to DOM: ", inputBox);
}

function clearLocalScene() {
    // myObjectsByFirebaseKey = {};
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //displayDiv.innerHTML = "";
}

// generates a string for prompting model 
async function askModel(inputValue, location) {
    let prompt;
    console.log("ASK SENTENCE FUNCTION FIRED");

    prompt = "a dark twisted version of a " + inputValue + " dressed up as a " + costumeData.costumes[getRandomIntInclusive(0, costumeData.costumes.length - 1)];
    console.log("Prompt is: ", prompt);
    document.body.style.cursor = "progress";
    const data = {
        version: "4acb778eb059772225ec213948f0660867b2e03f277448f18cf1800b96a65a1a",   //sticker
        input: {
            prompt: prompt,
            width: 512,
            height: 512,
            // output_format: jpg,
            negative_prompt: "shadow, background, pink, color",
        },
    };

    console.log("Making a Fetch Request", data);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    };

    const picture_info = await fetch(url, options);
    console.log("picture_response: ", picture_info);
    const proxy_said = await picture_info.json();

    if (proxy_said.output.length == 0) {
        console.log("Something went wrong, try again");
    } else {
        console.log("returned from API", proxy_said);
        // console.log("returned URL", proxy_said.output[0]);
        let imageURL = proxy_said.output[0];

        //send by url but maybe safer in long term to uncomment above and send by base64
        addImageRemote(proxy_said.output[0], inputValue, location);
    }
    document.body.style.cursor = "auto";
}

function addImageRemote(imgURL, inputValue, pos) {
    console.log("addImageRemote", imgURL, inputValue, pos);
    console.log("location x is: ")
    console.log(pos.x);
    console.log("location y is: ")
    console.log(pos.y);
    console.log("location rotation is: ")
    console.log(pos.rotation);
    // let title = document.getElementById("title").value;
    const newInputData = { type: "image", inputValue: inputValue, Xposition: pos.x, Yposition: pos.y, rotation: pos.rotation, imageURL: imgURL };

    addtoDatabase(newInputData);
}

function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(ratio, ratio);  // Scale the context based on the device's pixel ratio
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

async function addtoDatabase(newInputData) {
    let inputObjectJSON = JSON.stringify(newInputData);

    try {
        const response = await fetch('/new-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: inputObjectJSON
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Response from server:', result.message);
        } else {
            console.error('Failed to send data. Server responded with:', response.status);
        }
    } catch (error) {
        console.error('Error sending costume data:', error);
    }
}