<template>
  <div class="app-shell">
    <div class="ambient ambient-a"></div>
    <div class="ambient ambient-b"></div>
    <div class="ambient ambient-c"></div>
    <div class="grid-overlay"></div>
    <div class="scanlines"></div>

    <aside class="side-nav">
      <div class="brand-block">
        <div class="brand-mark">RT</div>
        <div>
          <p>AI RedTeam</p>
          <h1>AI Agent 红队平台</h1>
        </div>
      </div>

      <nav class="menu-list">
        <button
          v-for="item in navItems"
          :key="item.key"
          class="menu-item"
          :class="{ active: activePage === item.key }"
          @click="activePage = item.key"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </button>
      </nav>
    </aside>

    <main class="main-panel">
      <header class="topbar glass-card">
        <div class="topbar-left">
          <div class="topbar-title">
            <span class="eyebrow">ATTACK SIMULATION PLATFORM</span>
            <h2>{{ currentPageTitle }}</h2>
          </div>
          <div class="threat-badge">
            <span class="dot"></span>
            红队攻防态势运行中
          </div>
        </div>
        <div class="topbar-right">
          <div class="topbar-user">
            <el-icon><User /></el-icon>
            <span>红队操作员</span>
          </div>
          <button class="icon-button">
            <el-icon><Bell /></el-icon>
          </button>
          <div class="clock-box">{{ currentTime }}</div>
        </div>
      </header>

      <component :is="currentView" />
    </main>
  </div>
</template>

<script setup>
import { Bell, DataAnalysis, Document, HomeFilled, Operation, Setting, Suitcase, User } from '@element-plus/icons-vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AssetsPage from './pages/AssetsPage.vue'
import AttackExecution from './pages/AttackExecution.vue'
import AttackTasks from './pages/AttackTasks.vue'
import HomeDashboard from './pages/HomeDashboard.vue'
import ReportsPage from './pages/ReportsPage.vue'
import StrategyGenerator from './pages/StrategyGenerator.vue'
import SystemSettings from './pages/SystemSettings.vue'

const navItems = [
  { key: 'home', label: '首页', icon: HomeFilled, view: HomeDashboard },
  { key: 'tasks', label: '攻击任务', icon: Suitcase, view: AttackTasks },
  { key: 'strategy', label: '策略生成器', icon: Operation, view: StrategyGenerator },
  { key: 'execution', label: '攻击执行', icon: DataAnalysis, view: AttackExecution },
  { key: 'assets', label: '目标资产', icon: Document, view: AssetsPage },
  { key: 'reports', label: '评估报告', icon: DataAnalysis, view: ReportsPage },
  { key: 'settings', label: '系统设置', icon: Setting, view: SystemSettings }
]

const activePage = ref('home')
const currentTime = ref('')
let timer = null

const updateTime = () => {
  currentTime.value = new Date().toLocaleString('zh-CN', {
    hour12: false
  })
}

const currentView = computed(() => navItems.find((item) => item.key === activePage.value)?.view || HomeDashboard)
const currentPageTitle = computed(() => navItems.find((item) => item.key === activePage.value)?.label || '首页')

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
