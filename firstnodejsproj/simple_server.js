const http=require('http');

const server = http.createServer((req, res) => {
console.log(`New request received: ${req.method} ${req.url}`);

const{ url, method} = req;
if(url==='/' && method==='GET')
{
   res.writeHead(200, { 'Content-Type': 'text/plain' });

   res.end('Welcome to Day 2 of the Node.js Bootcamp of codespark tutorial!');

}
else if(url ==='/api/courses' && method ==='GET')
{ 
    res.writeHead(200, { 'Content-Type': 'application/json' });
        const courses = [
            { id: 1, title: 'Node.js Bootcamp', day: 2 },
            { id: 2, title: 'Async JavaScript', day: 3 }
        ];
        res.end(JSON.stringify(courses));
}
else{
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route Not Found', status: 404 }))
}



});

const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`server is running at http://localhost ${PORT}`);
});