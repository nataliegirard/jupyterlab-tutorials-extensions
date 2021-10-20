# JupyterLab Tutorials: Extensions

This repo has examples on how to build various types of extensions for JupyterLab.

## Set up a JupyterLab local development environment

- Install miniforge
- Create conda environment for JupyterLab
  `conda create -n jupyterlab-ext --override-channels --strict-channel-priority -c conda-forge -c nodefaults jupyterlab=3 cookiecutter nodejs jupyter-packaging git`
- Activate conda environment
  `conda activate jupyterlab-ext`
- Run JupyterLab
  `jupyter lab`
