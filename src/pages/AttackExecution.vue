<template>
  <div class="page-stack">
    <div class="execution-layout">
      <SectionCard title="攻击步骤时间线" subtitle="一次多轮攻击模拟过程" tone="cyan">
        <div class="timeline-list">
          <div
            v-for="(step, index) in executionSteps"
            :key="step"
            class="timeline-item"
            :class="{ active: index <= currentStepIndex }"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span>STEP {{ index + 1 }}</span>
              <strong>{{ step }}</strong>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="多轮对话模拟" subtitle="红队输入、模型响应与安全判定" tone="red">
        <div class="chat-sim">
          <div v-for="round in visibleRounds" :key="round.round" class="chat-round">
            <div class="chat-role red">
              <span>红队输入</span>
              <p>{{ round.redTeam }}</p>
            </div>
            <div class="chat-role blue">
              <span>目标模型响应</span>
              <p>{{ round.targetReply }}</p>
            </div>
            <div class="chat-judge">
              <div><label>安全判定</label><strong>{{ round.judged }}</strong></div>
              <div><label>是否拦截</label><strong>{{ round.judged === '已拦截' ? '是' : '否' }}</strong></div>
              <div><label>是否泄露</label><strong>{{ round.leaked }}</strong></div>
              <div><label>置信度</label><strong>{{ round.confidence }}</strong></div>
              <div><label>风险标签</label><strong>{{ round.riskTags.join(' / ') }}</strong></div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>

    <div class="metrics-grid execution-status-grid">
      <div class="glass-card metric-card tone-cyan">
        <p class="metric-label">当前轮次</p>
        <h2 class="metric-value">第 {{ currentRound }} 轮</h2>
      </div>
      <div class="glass-card metric-card tone-red">
        <p class="metric-label">成功 / 失败次数</p>
        <h2 class="metric-value">{{ successCount }} / {{ failCount }}</h2>
      </div>
      <div class="glass-card metric-card tone-purple">
        <p class="metric-label">攻击成功率</p>
        <h2 class="metric-value">{{ successRate }}%</h2>
      </div>
      <div class="glass-card metric-card tone-orange">
        <p class="metric-label">风险评分</p>
        <h2 class="metric-value">{{ riskScore }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import SectionCard from '../components/SectionCard.vue'
import { executionRounds, executionSteps } from '../data/mock'

const currentRound = ref(1)
let timer = null

const currentStepIndex = computed(() => Math.min(currentRound.value + 1, executionSteps.length - 1))
const visibleRounds = computed(() => executionRounds.slice(0, currentRound.value))
const successCount = computed(() => visibleRounds.value.filter((item) => item.judged !== '已拦截').length)
const failCount = computed(() => visibleRounds.value.filter((item) => item.judged === '已拦截').length)
const successRate = computed(() => Math.round((successCount.value / executionRounds.length) * 100))
const riskScore = computed(() => 52 + successCount.value * 11 + currentRound.value * 6)

onMounted(() => {
  timer = setInterval(() => {
    currentRound.value = currentRound.value >= executionRounds.length ? 1 : currentRound.value + 1
  }, 2600)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
