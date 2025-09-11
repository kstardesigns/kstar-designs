// Package iquit provides details for the HAIM I Quit applet.
package iquit

import (
	_ "embed"

	"tidbyt.dev/community/apps/manifest"
)

//go:embed iquit.star
var source []byte

// New creates a new instance of the HAIM I Quit applet.
func New() manifest.Manifest {
	return manifest.Manifest{
		ID:          "iquit",
		Name:        "HAIM I Quit",
		Author:      "Kyle Stark",
		Summary:     "HAIM's I Quit",
		Desc:        "Based on the HAIM band's I Quit album cover",
		FileName:    "iquit.star",
		PackageName: "iquit",
		Source:      source,
	}
}
