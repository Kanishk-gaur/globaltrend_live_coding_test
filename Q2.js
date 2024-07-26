const readline = require('readline');

class Pair {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
}

const infi = 1000000000;

class Node {
    constructor(vertexNumber) {
        this.vertexNumber = vertexNumber;
        this.children = [];
    }

    addChild(vNumber, length) {
        const p = new Pair(vNumber, length);
        this.children.push(p);
    }
}

function dijkstraDist(g, s, path) {
    const dist = new Array(g.length).fill(infi);
    const visited = new Array(g.length).fill(false);
    for (let i = 0; i < g.length; i++) {
        path[i] = -1;
    }
    dist[s] = 0;
    path[s] = -1;
    let current = s;
    const sett = new Set();
    while (true) {
        visited[current] = true;
        for (let i = 0; i < g[current].children.length; i++) {
            const v = g[current].children[i].first;
            if (visited[v]) continue;
            sett.add(v);
            const alt = dist[current] + g[current].children[i].second;
            if (alt < dist[v]) {
                dist[v] = alt;
                path[v] = current;
            }
        }
        sett.delete(current);
        if (sett.size === 0) break;
        let minDist = infi;
        let index = 0;
        for (const a of sett) {
            if (dist[a] < minDist) {
                minDist = dist[a];
                index = a;
            }
        }
        current = index;
    }
    return dist;
}

function printPath(path, i, s) {
    if (i !== s) {
        if (path[i] === -1) {
            console.log("Path not found!!");
            return;
        }
        printPath(path, path[i], s);
        console.log(path[i] + " ");
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the number of nodes: ', (nodes) => {
    const n = parseInt(nodes);
    let v = [];
    for (let i = 0; i < n; i++) {
        let node = new Node(i);
        v.push(node);
    }

    rl.question('Enter the number of edges: ', (edges) => {
        const e = parseInt(edges);
        let edgeCount = 0;
        console.log('Enter the edges in format (source destination weight):');

        rl.on('line', (line) => {
            const [src, dest, weight] = line.split(' ').map(Number);
            v[src].addChild(dest, weight);
            edgeCount++;
            if (edgeCount === e) {
                rl.question('Enter the source vertex: ', (source) => {
                    const s = parseInt(source);
                    let path = Array(v.length).fill(-1);
                    let dist = dijkstraDist(v, s, path);

                    for (let i = 0; i < dist.length; i++) {
                        if (dist[i] === infi) {
                            console.log(`${i} and ${s} are not connected`);
                            continue;
                        }
                        console.log(`Distance of ${i}th vertex from source vertex ${s} is: ${dist[i]}`);
                    }
                    rl.close();
                });
            }
        });
    });
});
