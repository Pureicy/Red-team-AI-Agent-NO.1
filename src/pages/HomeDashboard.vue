<template>
  <div class="page-stack">
    <div class="metrics-grid">
      <div
        v-for="card in overviewCards"
        :key="card.label"
        class="glass-card metric-card"
        :class="`tone-${card.tone}`"
      >
        <p class="metric-label">{{ card.label }}</p>
        <div class="metric-value-row">
          <h2 class="metric-value">{{ card.value }}</h2>
          <span class="metric-delta">{{ card.delta }}</span>
        </div>
      </div>
    </div>

    <div class="home-main-grid">
      <SectionCard title="攻击类型分布" subtitle="六类红队攻击流量占比" tone="purple">
        <ChartPanel :option="pieOption" />
      </SectionCard>

      <SectionCard
        title="AI Agent 攻击链路图"
        subtitle="从目标识别到自动化评估报告的全链路攻击模拟"
        tone="red"
      >
        <div class="attack-chain">
          <div
            v-for="(node, index) in attackChain"
            :key="node"
            class="chain-node"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <span class="chain-index">0{{ index + 1 }}</span>
            <strong>{{ node }}</strong>
          </div>
        </div>
      </SectionCard>

      <div class="home-side-stack">
        <SectionCard title="攻击成功率趋势" subtitle="近 7 日红队攻击效果演化" tone="cyan">
          <ChartPanel :option="trendOption" />
        </SectionCard>

        <SectionCard title="实时攻击日志" subtitle="最新红队执行告警流" tone="orange">
          <div class="log-list">
            <div v-for="log in realtimeLogs" :key="`${log.time}-${log.text}`" class="log-item">
              <SeverityTag :label="log.level" />
              <div class="log-content">
                <strong>{{ log.text }}</strong>
                <span>{{ log.time }}</span>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ChartPanel from '../components/ChartPanel.vue'
import SectionCard from '../components/SectionCard.vue'
import SeverityTag from '../components/SeverityTag.vue'
import { attackChain, attackTrend, attackTypeData, overviewCards, realtimeLogs } from '../data/mock'

const chartText = '#d7e3ff'

const pieOption = computed(() => ({
  tooltip: { trigger: 'item' },
  legend: {
    bottom: 0,
    textStyle: { color: chartText }
  },
  color: ['#6cf5ff', '#ff5d7d', '#8b7cff', '#ff9f43', '#49f6b6', '#5f7dff'],
  series: [
    {
      type: 'pie',
      radius: ['46%', '72%'],
      avoidLabelOverlap: true,
      label: {
        color: '#f3f6ff',
        formatter: '{b}\n{d}%'
      },
      labelLine: {
        lineStyle: { color: 'rgba(200,220,255,0.5)' }
      },
      itemStyle: {
        borderColor: 'rgba(8, 12, 28, 0.85)',
        borderWidth: 4,
        shadowBlur: 18,
        shadowColor: 'rgba(108, 245, 255, 0.25)'
      },
      data: attackTypeData
    }
  ]
}))

const trendOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { left: 30, right: 16, top: 28, bottom: 28 },
  xAxis: {
    type: 'category',
    data: attackTrend.labels,
    boundaryGap: false,
    axisLine: { lineStyle: { color: 'rgba(158, 184, 255, 0.3)' } },
    axisLabel: { color: chartText }
  },
  yAxis: {
    type: 'value',
    max: 100,
    splitLine: { lineStyle: { color: 'rgba(158, 184, 255, 0.1)' } },
    axisLabel: { color: chartText },
    axisLine: { show: false }
  },
  series: [
    {
      data: attackTrend.values,
      type: 'line',
      smooth: true,
      symbolSize: 10,
      lineStyle: { width: 4, color: '#6cf5ff' },
      itemStyle: {
        color: '#ff5d7d',
        shadowBlur: 12,
        shadowColor: 'rgba(255,93,125,0.7)'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(108,245,255,0.35)' },
            { offset: 1, color: 'rgba(108,245,255,0.02)' }
          ]
        }
      }
    }
  ]
}))
</script>
