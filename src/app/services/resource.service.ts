import { Injectable } from '@angular/core';
import { Resource } from '../models/resource';
import resources from './../assets/resources.json'

const resourcesList: Resource[] = resources;

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  getAll(): Resource[] {
    return resourcesList;
  }
}
