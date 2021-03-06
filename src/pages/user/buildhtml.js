export const buildPreviewHtml = (articleContent) => {
    return `
          <!Doctype html>
          <html>
            <head>
              <title>Preview Content</title>
              <style>
                html,body{
                  height: 100%;
                  margin: 0;
                  padding: 0;
                  overflow: auto;
                  background-color: #F6F6F6;
                }
                .container{
                  box-sizing: border-box;
                  width: 1000px;
                  max-width: 100%;
              
                  margin: 0 auto;
             
                  overflow: hidden;
                  background-color: #fff;
                  
                  border-right: solid 0px #eee;
                  border-left: solid 0px #eee;
                }
                .container img,
                .container audio,
                .container video{
                  max-width: 100%;
                  height: auto;
                }
                .container p{
                    padding: 15px;
                  white-space: pre-wrap;
                  min-height: 1em;
                }
                .container pre{
                  padding: 15px;
                  background-color: #000;
                  border-radius: 5px;
                  color:#fff
                }
                .container blockquote{
                  margin: 0;
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-left: 3px solid #d1d1d1;
                }
              </style>
            </head>
            <body>
            <div class="container">${articleContent}</div>
            </body>
          </html>
        `;
  };
  
  export default {
    buildPreviewHtml,
  };
  