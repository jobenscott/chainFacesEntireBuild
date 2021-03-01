const express = require('express');
let app = express();
let port = process.env.PORT || 6000;

let bodyParser = require('body-parser');


const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const getLeftFace = async (left_face, faces) => {
    if(left_face) {
        console.log('inside');
        console.log(faces.length);
        console.log('inside end');
        return faces.filter(function(f){
            return (
                f.left_face == left_face
            );
        })
    } else {
        return faces;
    }
}

const getLeftEye = async (left_eye, faces) => {
    // console.log('wtf');
    // console.log(faces);
    if(left_eye) {
        console.log('inside');
        console.log(faces.length);
        console.log('inside end')
        return faces.filter(function(f){
            return (
                f.left_eye == left_eye
            );
        })
    } else {
        return faces;
    }
}

const getNose = async (nose, faces) => {
    if(nose) {
        console.log('inside');
        console.log(faces.length);
        console.log('inside end')
        return faces.filter(function(f){
            return (
                f.nose == nose
            );
        })
    } else {
        return faces;
    }
}

const getRightEye = async (right_eye, faces) => {
    if(right_eye) {
        console.log('inside');
        console.log(faces.length);
        console.log('inside end')
        return faces.filter(function(f){
            return (
                f.right_eye == right_eye
            );
        })
    } else {
        return faces;
    }
}

const getRightFace = async (right_face, faces) => {
    if(right_face) {
        console.log('inside');
        console.log(faces.length);
        console.log('inside end')
        return faces.filter(function(f){
            return (
                f.right_face == right_face
            );
        })
    } else {
        return faces;
    }
}

app.get('/health', async function(req, res) {
    // res.json('We healthy');
    // let faces;
    // let req_face_parts = [req.params.left_face, req.params.left_eye, req.params.nose, req.params.right_eye, req.params.right_face];
    // fs.readFile('chain_faces.json', function(data){
        
    // });
    await fs.readFile('./chain_faces.json', 'utf8' , async (err, data) => {
        let faces = JSON.parse(data);
        console.log('init length');
        console.log(faces.length);
        console.log('end init length');
        // dirty ifs
        // left face
        left_face_check = await getLeftFace(req.query.left_face, faces);
        console.log(left_face_check.length);
        // left eye
        left_eye_check = await getLeftEye(req.query.left_eye, left_face_check);
        console.log(left_eye_check.length);
        // nose
        nose_check = await getNose(req.query.nose, left_eye_check);
        console.log(nose_check.length);
        // right eye
        right_eye_check = await getRightEye(req.query.right_eye, nose_check);
        console.log(right_eye_check.length);
        // right face
        let final_faces = await getRightFace(req.query.right_face, right_eye_check);
        // if(faces) {
            console.log(final_faces.length);
        res.json(final_faces);
        // } esle {
            // res.json([]);
        // }
       
        // for(let face in faces) {
        //     faces[face]['id'] = face;
        //     faces[face]['full_face'] = faces[face].left_face+faces[face].left_eye+faces[face].nose+faces[face].right_eye+faces[face].right_face

        // }
        // fs.writeFileSync('./chain_faces.json', JSON.stringify(faces));
    });
    

        
    // console.log(faces);
    // res.json('ok');
    

    // res.json('faces');
    
});

app.get('/', function(req, res) {
    
    res.json(200);
});

const csvFilePath='./chain_faces.csv';
const csv = require('csvtojson')

app.listen(port);
