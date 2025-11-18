import { WebDriver } from 'selenium-webdriver';
import { createDriver } from '../config/setup';

export interface TestResult {
  name: string;
  status: 'PASSED' | 'FAILED';
  error?: string;
  duration: number;
}

export class TestRunner {
  private driver: WebDriver | null = null;
  private results: TestResult[] = [];

  async beforeEach(): Promise<WebDriver> {
    this.driver = await createDriver();
    return this.driver;
  }

  async afterEach(): Promise<void> {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  async runTest(name: string, testFn: (driver: WebDriver) => Promise<void>): Promise<void> {
    const startTime = Date.now();
    console.log(`\n🧪 Running: ${name}`);

    try {
      const driver = await this.beforeEach();
      await testFn(driver);
      const duration = Date.now() - startTime;
      this.results.push({ name, status: 'PASSED', duration });
      console.log(`✅ PASSED: ${name} (${duration}ms)`);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.results.push({ name, status: 'FAILED', error: errorMessage, duration });
      console.error(`❌ FAILED: ${name} (${duration}ms)`);
      console.error(`   Error: ${errorMessage}`);
    } finally {
      await this.afterEach();
    }
  }

  printSummary(): void {
    const passed = this.results.filter(r => r.status === 'PASSED').length;
    const failed = this.results.filter(r => r.status === 'FAILED').length;
    const total = this.results.length;
    const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0);

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total tests: ${total}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⏱️  Total duration: ${totalDuration}ms`);
    console.log('='.repeat(60));

    if (failed > 0) {
      console.log('\nFailed tests:');
      this.results
        .filter(r => r.status === 'FAILED')
        .forEach(r => {
          console.log(`  ❌ ${r.name}`);
          console.log(`     ${r.error}`);
        });
    }

    // Exit with error code if tests failed
    if (failed > 0) {
      process.exit(1);
    }
  }

  getResults(): TestResult[] {
    return this.results;
  }
}
