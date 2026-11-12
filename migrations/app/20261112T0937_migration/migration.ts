#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3d13ed962a152e0fbbe9768a10e306253b1118f41615424c8de23e4b83c346e6/contract';
import endContract from '../../snapshots/3d13ed962a152e0fbbe9768a10e306253b1118f41615424c8de23e4b83c346e6/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/93b3f1b3807c07b699a1571ec5916173cc889bd46fc167077e9f0658b419fd27/contract';
import startContract from '../../snapshots/93b3f1b3807c07b699a1571ec5916173cc889bd46fc167077e9f0658b419fd27/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'Session',
        column: col('lastActivityAt', 'timestamptz(3)', {
          notNull: true,
          default: fn(sql`now()`),
          codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
