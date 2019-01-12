// https://shaderfrog.com/app/view/2183
export default `
/*
*
* Example Fragment Shader
* Sets the color and alpha of the pixel by setting gl_FragColor
*/

// Set the precision for data types used in this shader
precision highp float;
precision highp int;


// Default uniforms provided by ShaderFrog.
uniform float time;

// A uniform unique to this shader. You can modify it to the using the form
// below the shader preview. Any uniform you add is automatically given a form
uniform mat4 modelMatrix;
uniform vec3 color;
uniform vec3 edgecolor;
//uniform vec3 specularColor;
uniform vec3 lightPosition;

// Example varyings passed from the vertex shader
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec2 vUv2;

void main() {

    // Calculate the real position of this pixel in 3d space, taking into account
    // the rotation and scale of the model. It's a useful formula for some effects.
    // This could also be done in the vertex shader
    vec3 worldPosition = ( modelMatrix * vec4( vPosition, 1.0 )).xyz;

    // Calculate the normal including the model rotation and scale
    vec3 worldNormal = normalize( vec3( modelMatrix * vec4( vNormal, 0.0 ) ) );

    vec3 lightVector = normalize( lightPosition - worldPosition );
    
    vec3 cameraVector = normalize( cameraPosition - worldPosition );
    
    // Setting a color difference between unlit and specular.
    float colordiff = 0.6;
    
    //Substracting the difference from the main color for the shaded part
    vec3 unlitColor = vec3(color.x - colordiff, color.y - colordiff, color.z - colordiff);
    
    // Adding the difference from the main color for the highlighted part
    vec3 specularColor = vec3(color.x + colordiff, color.y + colordiff, color.z + colordiff);

    // An example simple lighting effect, taking the dot product of the normal
    // (which way this pixel is pointing) and a user generated light position
    float brightness = dot( worldNormal, lightVector );
    
    vec3 reflectance = normalize(2.0 * dot(lightVector,worldNormal)*worldNormal-lightVector);

    
    if(dot(cameraVector,worldNormal)<0.3){
        gl_FragColor = vec4(edgecolor,1.0);
    } else {
        if (dot(worldNormal,lightVector)>0.0){
            gl_FragColor = vec4(color,1.0);
            if (length(cameraVector - reflectance)<0.6){
                if(length(worldNormal - reflectance) > 0.2){
                    gl_FragColor = vec4(specularColor,1.0);
                }
            }
        } else {
            gl_FragColor = vec4(unlitColor,1.0);
        }
        

    }
    
    // Fragment shaders set the gl_FragColor, which is a vector4 of
    // ( red, green, blue, alpha ).

}
`