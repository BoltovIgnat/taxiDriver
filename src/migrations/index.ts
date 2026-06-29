import * as migration_20260629_134315_initial from './20260629_134315_initial';

export const migrations = [
  {
    up: migration_20260629_134315_initial.up,
    down: migration_20260629_134315_initial.down,
    name: '20260629_134315_initial'
  },
];
