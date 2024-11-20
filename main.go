package main

import (
	"log"
	"net/http"
)

func main() {
	// Serve static files from the current directory (including index.html and the scripts directory)
	http.Handle("/", http.FileServer(http.Dir(".")))

	// Start the web server on port 3000
	log.Println("Starting server on :3000...")
	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
