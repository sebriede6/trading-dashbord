terraform {
  required_version = ">= 1.6.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.59"
    }
  }
}

provider "azurerm" {
  features {}
}

# Beispiel-Ressource
# resource "azurerm_resource_group" "main" {
#   name     = "my-rg"
#   location = "westeurope"
# }
