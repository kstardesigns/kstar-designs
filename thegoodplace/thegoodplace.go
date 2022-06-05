// Package thegoodplace provides details for The Good Place applet.
package thegoodplace

import (
	_ "embed"

	"tidbyt.dev/community/apps/manifest"
)

//go:embed thegoodplace.star
var source []byte

// New creates a new instance of the Burger of the Day applet.
func New() manifest.Manifest {
	return manifest.Manifest{
		ID:          "thegoodplace",
		Name:        "The Good Place",
		Author:      "Kyle Stark",
		Summary:     "Displays good/bad actions",
		Desc:        "Displays good and bad actions from The Good Place, along with their point values.",
		FileName:    "thegoodplace.star",
		PackageName: "thegoodplace",
		Source:  source,
	}
}