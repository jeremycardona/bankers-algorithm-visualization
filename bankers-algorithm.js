var main = function () {
	// currently allocated resources matrix
	var curr = [[2, 0, 1, 1], [0, 1, 2, 1], [4, 0, 0, 3], [0, 2, 1, 0], [1, 0, 3, 0]];
	// max claim requested 
	var max_claim = [[3, 2, 1, 4], [0, 2, 5, 2], [5, 1, 0, 5], [1, 5, 3, 0], [3, 0, 3, 3]];
	// currently available resources
	var avl = [];
	// aux table
	var alloc = [0, 0, 0, 0, 0];
	// max resources 
	var max_res = [8, 5, 9, 7];
	var running = [];
	var i, j, exec, r = 4, p = 5;
	//number of process count
	var count = 0;
	var safe = false;
	document.getElementById("p").innerHTML = p;
	document.getElementById("r").innerHTML = r;
	// after getting r and p
	for (i = 0; i < p; i++) {
		running[i] = 1;
		count++;
	}
	console.log("\nThe Claim Vector is: ");
	for (i = 0; i < r; i++) {
		console.log("%d ", max_res[i]);
		document.getElementById("max_res").innerHTML += max_res[i] + " ";
	}

	console.log("\nThe Allocated Resource Table:\n");
	for (i = 0; i < p; i++) {
		for (j = 0; j < r; j++) {
			console.log("\t%d", curr[i][j]);
			document.getElementById("curr").innerHTML += curr[i][j] + " ";
		}
		document.getElementById("curr").innerHTML += "<br />";
		console.log("\n");
	}

	console.log("\nThe Maximum Claim Table:\n");
	for (i = 0; i < p; i++) {
		for (j = 0; j < r; j++) {
			console.log("\t%d", max_claim[i][j]);
			document.getElementById("max_claim").innerHTML += max_claim[i][j] + " ";
		}
		document.getElementById("max_claim").innerHTML += "<br />";
		console.log("\n");
	}

	for (i = 0; i < p; i++) {
		for (j = 0; j < r; j++) {
			alloc[j] += curr[i][j];
		}
	}

	console.log("\nAllocated resources: ");
	for (i = 0; i < r; i++) {
		console.log("%d ", alloc[i]);
		document.getElementById("alloc").innerHTML += alloc[i] + " ";
	}
	for (i = 0; i < r; i++)
		avl[i] = max_res[i] - alloc[i];

	console.log("\nAvailable resources: ");
	for (i = 0; i < r; i++) {
		console.log("%d ", avl[i]);
		document.getElementById("avl").innerHTML += avl[i] + " ";
	}
	console.log("\n");


	//set up visualization
	var jsav = new JSAV("av");
	var g = jsav.ds.graph({ width: 500, height: 200, layout: "automatic", directed: true });
	var p1 = g.addNode("P1"),
		p2 = g.addNode("P2"),
		p3 = g.addNode("P3"),
		p4 = g.addNode("P4"),
		p5 = g.addNode("P5"),
		r1 = g.addNode("R1", {"color": "green"});
		r2 = g.addNode("R2", {"color": "green"});
		r3 = g.addNode("R3", {"color": "green"});
		r4 = g.addNode("R4", {"color": "green"});
		r1.css({"background": "salmon"});
		r2.css({"background": "salmon"});
		r3.css({"background": "salmon"});
		r4.css({"background": "salmon"});
		
		g.addEdge(p1,r1);
		g.addEdge(p2,r2);
		g.addEdge(p3,r3);
		g.addEdge(p4,r4);
		g.addEdge(p5,r1);
		
		g.layout();
		jsav.recorded();
	while (count != 0) {
		safe = false;
		for (i = 0; i < p; i++) {
			if (running[i]) {
				exec = 1;
				for (j = 0; j < r; j++) {
					if (max_claim[i][j] - curr[i][j] > avl[j]) {
						exec = 0;
						break;
					}
				}

				if (exec) {
					console.log("\nProcess%d is executing.\n", i + 1);
					document.getElementById("exec").innerHTML += "Process " + (i+1) + " is executing";
					document.getElementById("exec").innerHTML += "<br/>";
					running[i] = 0;
					count--;
					safe = true;
					for (j = 0; j < r; j++) {
						var P,R;
						avl[j] += curr[i][j];
					}
					break;
				}
			}
		}

		if (!safe) {
			console.log("\nThe processes are in unsafe state.");
			document.getElementById("safe").innerHTML = "The processes are in unsafe state.";
			break;
		}

		if (safe)
			console.log("\nThe process is in safe state.");
		document.getElementById("safe").innerHTML = "The processes are in safe state.";
		console.log("\nAvailable vector: ");
		for (i = 0; i < r; i++) {
			console.log("%d ", avl[i]);
		}
	}
}