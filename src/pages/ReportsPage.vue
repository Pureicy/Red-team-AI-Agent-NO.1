<template>
  <div class="page-stack">
    <SectionCard title="评估报告中心" subtitle="自动汇总攻击效果、漏洞清单与防御建议" tone="purple">
      <el-table :data="reports" class="themed-table" height="320">
        <el-table-column prop="id" label="报告ID" min-width="140" />
        <el-table-column prop="targetName" label="目标名称" min-width="150" />
        <el-table-column prop="successRate" label="攻击成功率" width="120" />
        <el-table-column prop="severityCount" label="高/中/低危数量" min-width="130" />
        <el-table-column prop="score" label="安全评分" width="100" />
        <el-table-column prop="createdAt" label="生成时间" min-width="160" />
        <el-table-column label="操作" width="140">
          <template #default="{ row }">
            <el-button link type="primary" @click="openReport(row)">查看</el-button>
            <el-button link type="danger">导出PDF</el-button>
          </template>
        </el-table-column>
      </el-table>
    </SectionCard>

    <el-dialog
      v-model="dialogVisible"
      width="1080px"
      top="4vh"
      class="glass-dialog report-dialog"
      :title="`报告详情 - ${activeReport?.targetName || ''}`"
    >
      <div class="report-detail-grid">
        <SectionCard title="总体安全评分仪表盘" subtitle="综合风险基线" tone="red">
          <ChartPanel :option="gaugeOption" />
        </SectionCard>

        <SectionCard title="攻击成功率图" subtitle="多类攻击成功率表现" tone="cyan">
          <ChartPanel :option="barOption" />
        </SectionCard>

        <SectionCard title="漏洞清单表格" subtitle="需优先修复的风险项" tone="orange">
          <el-table :data="reportVulnerabilities" class="themed-table" height="280">
            <el-table-column prop="id" label="漏洞ID" width="90" />
            <el-table-column prop="category" label="类别" width="100" />
            <el-table-column prop="desc" label="问题描述" min-width="240" />
            <el-table-column label="等级" width="90">
              <template #default="{ row }">
                <SeverityTag :label="row.severity" />
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="90" />
          </el-table>
        </SectionCard>

        <SectionCard title="攻击链路图" subtitle="典型攻击路径复盘" tone="purple">
          <div class="attack-chain compact">
            <div v-for="(node, index) in attackChain" :key="node" class="chain-node">
              <span class="chain-index">0{{ index + 1 }}</span>
              <strong>{{ node }}</strong>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="防御建议卡片" subtitle="高优先级整改项" tone="cyan">
          <div class="advice-grid">
            <div v-for="item in defenseAdvice" :key="item" class="advice-card">
              <span>DEFENSE</span>
              <p>{{ item }}</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ChartPanel from '../components/ChartPanel.vue'
import SectionCard from '../components/SectionCard.vue'
import SeverityTag from '../components/SeverityTag.vue'
import { attackChain, defenseAdvice, reports, reportVulnerabilities } from '../data/mock'

const dialogVisible = ref(false)
const activeReport = ref(reports[0])

const openReport = (row) => {
  activeReport.value = row
  dialogVisible.value = true
}

const gaugeOption = computed(() => ({
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 100,
      progress: { show: true, roundCap: true, width: 12 },
      axisLine: { lineStyle: { width: 12, color: [[1, 'rgba(117, 141, 255, 0.18)']] } },
      pointer: { itemStyle: { color: '#ff5d7d' } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { color: '#d7e3ff' },
      detail: {
        valueAnimation: true,
        formatter: '{value}',
        color: '#f6f8ff',
        fontSize: 30,
        offsetCenter: [0, '62%']
      },
      title: {
        color: '#9eb8ff',
        fontSize: 14,
        offsetCenter: [0, '86%']
      },
      data: [{ value: activeReport.value?.score || 68, name: '综合安全评分' }]
    }
  ]
}))

const barOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { left: 30, right: 12, top: 20, bottom: 26 },
  xAxis: {
    type: 'category',
    data: ['越狱', '注入', '工具', '隐私', '伪装', '窃取'],
    axisLabel: { color: '#d7e3ff' },
    axisLine: { lineStyle: { color: 'rgba(158,184,255,0.3)' } }
  },
  yAxis: {
    type: 'value',
    max: 100,
    axisLabel: { color: '#d7e3ff' },
    splitLine: { lineStyle: { color: 'rgba(158,184,255,0.1)' } }
  },
  series: [
    {
      type: 'bar',
      barWidth: 18,
      data: [78, 84, 63, 57, 51, 46],
      itemStyle: {
        borderRadius: [10, 10, 0, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#ff5d7d' },
            { offset: 1, color: '#6c63ff' }
          ]
        }
      }
    }
  ]
}))
</script>
