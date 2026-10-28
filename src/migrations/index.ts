import * as migration_20261027_160311_initial from './20261027_160311_initial';
import * as migration_20261027_181631_cms_v2 from './20261027_181631_cms_v2';
import * as migration_20261027_190511_sections_design_blog from './20261027_190511_sections_design_blog';

export const migrations = [
  {
    up: migration_20261027_160311_initial.up,
    down: migration_20261027_160311_initial.down,
    name: '20261027_160311_initial',
  },
  {
    up: migration_20261027_181631_cms_v2.up,
    down: migration_20261027_181631_cms_v2.down,
    name: '20261027_181631_cms_v2',
  },
  {
    up: migration_20261027_190511_sections_design_blog.up,
    down: migration_20261027_190511_sections_design_blog.down,
    name: '20261027_190511_sections_design_blog'
  },
];
